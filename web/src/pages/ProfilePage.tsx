import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LinksList } from "../components/LinksList";
import { config } from "../config/config";
import { useApi } from "../hooks/useApi";
import { ILink } from "../interface/link.interface";
import { IRootState } from "../interface/rootState.interface";

interface ProfilePageProps {}

export const ProfilePage: React.FC<ProfilePageProps> = ({}) => {
  console.log(config.server.serverUrl);
  const { request, dispatchError } = useApi();
  const user = useSelector((state: IRootState) => state.authReducer.user);
  const loading = useSelector(
    (state: IRootState) => state.notifyReducer.loading
  );
  const [links, setLinks] = useState<ILink[]>([]);
  useEffect(() => {
    request({
      url: "/api/link",
      method: "GET",
      headers: {},
    }).then(
      (res) => setLinks(res.links),
      (e) => dispatchError(e)
    );
  }, []);
  return (
    <>
      <LinksList links={links} />
    </>
  );
};
