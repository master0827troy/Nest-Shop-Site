import {
  collection,
  addDoc,
  Timestamp,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

export const useFirestore = (c) => {
  const [isCancelled, setIsCancelled] = useState(false);
  const ref = collection(db, c);

  const addDocument = async (doc) => {
    try {
      const createdAt = Timestamp.fromDate(new Date());
      const addedDoc = await addDoc(ref, { ...doc, createdAt });
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateDocument = async (id, newData) => {
    const ref = doc(db, c, id);
    try {
      const updatedDocument = await updateDoc(ref, newData);
      return updatedDocument;
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteDocument = async (id) => {
    const ref = doc(db, c, id);
    try {
      await deleteDoc(ref);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getDocument = async (id) => {
    const ref = doc(db, c, id);
    try {
      const snap = await getDoc(ref);
      console.log(snap.data());
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return {
    addDocument,
    updateDocument,
    deleteDocument,
    getDocument,
    response,
  };
};
