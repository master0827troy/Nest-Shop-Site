import { useCallback, useEffect, useState } from "react";
import {
  doc,
  collection,
  where,
  query,
  limit,
  orderBy,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const useGetFirestoreData = (
  c,
  documentId,
  whereStatement,
  orderBy_,
  orderType,
  limit_
) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [whereStatementProperty, setWhereStatementProperty] = useState(whereStatement?.lhs)
  const [whereStatementOperator, setWhereStatementOperator] = useState(whereStatement?.op)
  const [whereStatementValue, setWhereStatementValue] = useState(whereStatement?.rhs)

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      if (documentId) {
        const docSnap = await getDoc(doc(db, c, documentId));

        if (docSnap.exists()) {
          setData({ ...docSnap.data(), id: documentId });
          setIsLoading(false);
        } else {
          setError('Document does not exist');
          setIsLoading(false);
        }
      } else {
        let queryCollection = collection(db, c);

        let queryWhere;
        if (whereStatementProperty && whereStatementOperator && whereStatementValue) {
          queryWhere = where(whereStatementProperty, whereStatementOperator, whereStatementValue);
        }

        let queryOrderBy = orderBy_ && orderBy(orderBy_, orderType || "asc");
        let queryLimit = limit_ && limit(limit_);

        const queryConstraints = { queryWhere, queryOrderBy, queryLimit };
        const filteredQueryConstraints = Object.entries(
          queryConstraints
        ).reduce((acc, [key, value]) => {
          if (value !== null && value !== undefined) {
            acc[key] = value;
          }
          return acc;
        }, {});
        const filteredQueryConstraintsArray = Object.values(
          filteredQueryConstraints
        );

        let result = [];

        const q = filteredQueryConstraintsArray ?
          query(queryCollection, ...filteredQueryConstraintsArray)
        :
          queryCollection

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            result.push({ ...doc.data(), id: doc.id });
          });

          setData(result);
          setIsLoading(false);
      }
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, [c, documentId, whereStatementProperty, whereStatementOperator, whereStatementValue, orderBy_, orderType, limit_]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setWhereStatementProperty(whereStatement?.lhs);
    setWhereStatementOperator(whereStatement?.op);
    setWhereStatementValue(whereStatement?.rhs);
  }, [whereStatement]);

  const reFetchData = () => {
    fetchData();
  };

  return { data, isLoading, error, reFetchData };
};

export default useGetFirestoreData;