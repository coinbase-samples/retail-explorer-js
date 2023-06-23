import * as React from "react";
import { useContext, useState, useEffect } from "react";
import Layout from "../components/Layouts";
import { useRouter } from "next/router";
import { Button, Spinner } from "@cloudscape-design/components";
import { UserConnect } from "../components/UserConnect";
import { UserContext } from "../context/UserContext";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { query } = router;
  const { getAuthToken, authToken, gettingToken } = useContext(UserContext);
  const code = query.code;

  useEffect(() => {
    const token = authToken?.access_token;
    if (Object.keys(authToken || {}).length === 0 && code === undefined) {
      return;
    } else if ((code && !gettingToken && token !== undefined) || token) {
      setLoading(true);
      setTimeout(() => {
        router.push(`/landing?token=${token}`);
      }, 3000); // Delay of 1 second before redirecting
    } else {
      setLoading(true);
      getAuthToken(code)
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          // Handle any error that occurs during token retrieval
          setLoading(false);
          console.error(error);
        });
    }
  }, [authToken, code]);

  const closePreviewModal = () => {
    setShowModal(false);
  };

  return (
    <Layout>
      {loading ? (
        <Spinner size="large" />
      ) : (
        !showModal && (
          <>
            <h1>Welcome to Retail API Explorer!</h1>
            <p>
              Please connect your Coinbase Retail Account to explore our Retail
              APIs.
            </p>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Connect Coinbase Account
            </Button>
          </>
        )
      )}

      {showModal && <UserConnect open={showModal} close={closePreviewModal} />}
    </Layout>
  );
}
