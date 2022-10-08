import { db } from 'config/firebase'
import { ref, push } from "firebase/database";

export const getAll = () => ref(db, 'users');

export const create = ({ userId, name, email }) => {
  console.log('####CREATE', userId, name, email, new Date())
  push(ref(db), {
    name: name,
    email: email,
    createdAt: new Date(),
  })
}