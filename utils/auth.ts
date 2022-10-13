// import { hash, compare } from 'bcrypt';
import { db } from 'config/firebase';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { getConverter } from './converter';
import { hash, compare } from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

const Users = collection(db, 'users').withConverter(getConverter());

export async function getUserByEmail(email: string) {
  const userQuery = query(Users, where('email', '==', email), limit(1));
  const userSnapshots = await getDocs(userQuery);
  const userSnpashot = userSnapshots.docs[0];
  if (
    (userSnpashot === null || userSnpashot === void 0
      ? void 0
      : userSnpashot.exists()) &&
    Users.converter
  ) {
    return Users.converter.fromFirestore(userSnpashot);
  }
  return null;
}
