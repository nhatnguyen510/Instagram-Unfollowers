import {
  IgCheckpointError,
  IgResponseError,
  IgLoginBadPasswordError,
  IgLoginInvalidUserError,
  IgLoginTwoFactorRequiredError,
  IgCookieNotFoundError,
} from "instagram-private-api";
import Bluebird from "bluebird";
import inquirer from "inquirer";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { ig } from "../APIClient/index.js";
import CryptoJS from "crypto-js";
import { parse, stringify } from "flatted/esm";

export const login = async (req, res) => {
  const { username, password } = req.body;

  Bluebird.try(async () => {
    ig.state.generateDevice(username);

    await readState(ig);

    ig.request.end$.subscribe(() => saveState(ig));

    const user = await ig.account.login(username, password);

    res.status(200).json({
      ...user,
    });
  })
    .catch(IgLoginTwoFactorRequiredError, async (err) => {
      const { username, totp_two_factor_on, two_factor_identifier } =
        err.response.body.two_factor_info;
      console.log({ username, totp_two_factor_on, two_factor_identifier });
      // decide which method to use
      const verificationMethod = totp_two_factor_on ? "0" : "1"; // default to 1 for SMS

      res.status(200).json({
        username,
        totp_two_factor_on,
        two_factor_identifier,
        verificationMethod,
      });
    })
    .catch(IgCheckpointError, async () => {
      console.log(ig.state.checkpoint); // Checkpoint info here
      await ig.challenge.auto(true); // Requesting sms-code or click "It was me" button
      console.log(ig.state.checkpoint); // Challenge info here
      const { code } = await inquirer.prompt([
        {
          type: "input",
          name: "code",
          message: "Enter code",
        },
      ]);
      console.log(await ig.challenge.sendSecurityCode(code));
    })
    .catch(
      IgLoginInvalidUserError,
      IgLoginBadPasswordError,
      IgResponseError,
      (e) => {
        res.status(400).json({
          message: e.text,
        });
      }
    );
};

export const loginWithTwoFactors = async (req, res) => {
  const {
    verificationCode,
    username,
    two_factor_identifier,
    verificationMethod,
  } = req.body;

  Bluebird.try(async () => {
    const data = await ig.account.twoFactorLogin({
      username,
      twoFactorIdentifier: two_factor_identifier,
      verificationCode,
      verificationMethod,
    });

    res.status(200).json({
      message: "Login 2FA Successfully!!!",
      data,
    });
  }).catch(IgResponseError, (e) => {
    res.status(400).json({
      message: e.text,
    });
  });
};

export const logout = async (req, res) => {
  Bluebird.try(async () => {
    const logout = await ig.account.logout();

    res.status(200).json({
      message: logout,
    });
  }).catch((e) => {
    res.status(400).json({
      e,
    });
  });
};

export const encryptUser = async (req, res) => {
  const { user } = req.body;

  const encryptedUser = CryptoJS.AES.encrypt(
    JSON.stringify(user),
    process.env.SECRET_KEY
  );

  res.status(200).json({ encryptedUser: encryptedUser.toString() });
};

export const decryptUser = (req, res) => {
  const { encryptedUser } = req.body;

  const decryptedUser = CryptoJS.AES.decrypt(
    encryptedUser,
    process.env.SECRET_KEY
  ).toString(CryptoJS.enc.Utf8);

  res.status(200).json({ decryptedUser: JSON.parse(decryptedUser) });
};

async function saveState(ig) {
  // the normal saving of cookies for te instagram-api
  const cookies = await ig.state.serializeCookieJar();
  const state = {
    deviceString: ig.state.deviceString,
    deviceId: ig.state.deviceId,
    uuid: ig.state.uuid,
    phoneId: ig.state.phoneId,
    adid: ig.state.adid,
    build: ig.state.build,
  };
  return writeFileSync(
    "state.json",
    JSON.stringify({
      cookies: JSON.stringify(cookies),
      state,
    }),
    { encoding: "utf8" }
  );
}

async function readState(ig) {
  if (!existsSync("state.json")) return;
  // normal reading of state for the instagram-api
  const { cookies, state } = JSON.parse(
    readFileSync("state.json", { encoding: "utf8" })
  );

  ig.state.deviceString = state.deviceString;
  ig.state.deviceId = state.deviceId;
  ig.state.uuid = state.uuid;
  ig.state.phoneId = state.phoneId;
  ig.state.adid = state.adid;
  ig.state.build = state.build;
  await ig.state.deserializeCookieJar(cookies);
}

export const findUnfollowers = async (req, res) => {
  Bluebird.try(async () => {
    const followersFeed = ig.feed.accountFollowers(ig.state.cookieUserId);
    const followingFeed = ig.feed.accountFollowing(ig.state.cookieUserId);

    const followers = await getAllItemsFromFeed(followersFeed);
    const following = await getAllItemsFromFeed(followingFeed);

    const followersUsername = new Set(
      followers.map(({ username }) => username)
    );

    const notFollowingYou = following.filter(
      ({ username }) => !followersUsername.has(username)
    );

    const usersNotFollowingYou = notFollowingYou.map((user) => user.username);

    res.status(200).json({
      usersNotFollowingYou,
    });
  }).catch(IgCookieNotFoundError, (e) => {
    res.status(400).json({
      message: e.message,
    });
  });
  // for (const user of notFollowingYou) {
  //   if (user.username == "cristiano") {
  //     await ig.friendship.destroy(user.pk);
  //     console.log(`unfollowed ${user.username}`);
  //     const time = Math.round(Math.random() * 6000) + 1000;
  //     await new Promise((resolve) => setTimeout(resolve, time));
  //   }
  //   /*
  //       Time, is the delay which is between 1 second and 7 seconds.
  //       Creating a promise to stop the loop to avoid api spam
  //    */
  // }
};

async function getAllItemsFromFeed(feed) {
  let items = [];
  do {
    items = items.concat(await feed.items());
  } while (feed.isMoreAvailable());
  return items;
}
