import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "../../store/profile/profileOperations";

import PageTitle from "../../components/PageTitle/PageTitle";
import Section from "../../components/Section/Section";
import ProfileForm from "../../components/ProfileForm/ProfileForm";

const ProfilePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <Section>
      <PageTitle
        title="Profile Details"
        subtitle="Add your details to create a personal touch to your profile."
      />

      <ProfileForm />
    </Section>
  );
};

export default ProfilePage;
