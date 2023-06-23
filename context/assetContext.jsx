import React, { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
const defaultState = {};

export const AssetContext = createContext(defaultState);

const AssetProvider = ({ children }) => {
  const router = useRouter();

  const [assetLoading, setAssetLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  const [userAsset, setUserAsset] = useState([]);
  const [asset, setAsset] = useState("");

  const getAsset = async (token, asset) => {
    if (fetching && assetLoading) {
      return;
    }
    try {
      setFetching(true);
      setAssetLoading(true);
      const assetResponse = await fetch(
        `/api/accounts/${asset}?token=${token}`,
        {
          method: "GET",
        }
      );

      const data = await assetResponse.json();
      if (data.errors) {
        alert("You are not authorized to view this page, please log in");
        await router.push("/");
      } else {
        setUserAsset(data);
        setAssetLoading(false);
        setFetching(false);
      }
    } catch (error) {
      console.log(error);
      setUserAsset([]);
      setAssetLoading(false);
      setFetching(false);
    }
  };

  const selectedAsset = async (asset) => {
    setAsset(asset);
  };

  const state = {
    userAsset,
    assetLoading,
    getAsset,
    asset,
    selectedAsset,
    setAsset,
  };

  return (
    <AssetContext.Provider value={state}>{children}</AssetContext.Provider>
  );
};

export default AssetProvider;
