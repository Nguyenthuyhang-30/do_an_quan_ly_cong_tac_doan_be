"use strict";

const shopModel = require("../models/shop.model");
const bycrypt = require("bcrypt");
const crypto = require("crypto");
const keyTokenService = require("./keyToken.service");

// Define roles nhớ sửa để ra ngoài ký tự khác tự quy ước
const RoleShop = {
  SHOP: "001",
  WRITER: "002",
  EDITOR: "003",
  ADMIN: "004",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      // step 1: check if user already exists
      const hodelShop = await shopModel.findOne({ email }).lean();
      if (hodelShop) {
        return {
          code: "xxxx",
          message: "User already exists",
          status: "error",
        };
      }

      const passwordHash = await bycrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      });

      if (newShop) {
        // step 2: create private key and public key
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "spki",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
          },
        });

        console.log({
          privateKey,
          publicKey,
        });

        const tokenKeyString = await keyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
        });

        // step 3: return success response
        return {
          code: "0000",
          message: "User signed up successfully",
          status: "success",
        };
      }
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };
}

module.exports = AccessService;
