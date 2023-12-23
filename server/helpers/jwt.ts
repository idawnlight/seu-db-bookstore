import jwt from "jsonwebtoken";

const JWT_SECRET = "QrQna!2^t5T5UdePd96fkgTx";

interface TokenPayload {
    userId: string;
}

// TODO: remove any
export const verifyToken = (token: string): any => {
    return jwt.verify(token, JWT_SECRET);
}

export const createToken = (payload: any): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}
