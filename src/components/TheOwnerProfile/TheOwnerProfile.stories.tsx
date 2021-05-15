import React from "react";
import { Story, Meta } from "@storybook/react";
import { ApolloProvider } from "@apollo/client";

import { useApollo } from "../../libs/apollo-client";

import TheOwnerProfile, { TheOwnerProfileProps } from "./TheOwnerProfile";
export default {
  title: "TheOwnerProfile",
  component: TheOwnerProfile,
} as Meta;

const Template: Story<TheOwnerProfileProps> = (args) => {
  const pageProps = {};
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <TheOwnerProfile {...args} />
    </ApolloProvider>
  );
};

export const User = Template.bind({});
User.args = {
  owner: "topheman",
  tab: "default",
};

export const Organization = Template.bind({});
Organization.args = {
  owner: "facebook",
  tab: "default",
};
