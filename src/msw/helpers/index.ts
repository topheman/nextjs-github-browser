import { User } from "../../libs/graphql";

export const makeUser = (props: Partial<User> = {}): User => {
  return {
    name: "Christophe Rosset",
    login: "topheman",
    bio: "❤️JavaScript",
    websiteUrl: "http://labs.topheman.com/",
    twitterUsername: "topheman",
    avatarUrl: "https://avatars.githubusercontent.com/u/985982?v=4",
    location: "Paris",
    followers: {
      totalCount: 177,
    },
    following: {
      totalCount: 3,
    },
    starredRepositories: {
      totalCount: 363,
    },
    repositories: {
      totalCount: 78,
    },
    ...props,
  } as User;
};

export const makeProfileReadMe = (): string =>
  'My name is Christophe Rosset, I live in 🇫🇷 Paris, France.\n\nI’ve been working in Web Development for a long time now, I still really enjoy it and keep learning new things. What I like the most is sharing my knowledge with others, not only in my job but also through my personal projects.\n\n<p align="center">\n    <a href="https://twitter.com/topheman" title="@topheman on twitter"><img alt="@topheman on twitter" src="https://img.shields.io/badge/-twitter-1DA1F2?style=flat-square&logo=twitter&logoColor=white"></a>\n    <a href="https://www.linkedin.com/in/topheman" title="@topheman on LinkedIn"><img alt="@topheman on LinkedIn" src="https://img.shields.io/badge/-LinkedIn-2867B2?style=flat-square&logo=linkedin&logoColor=white"></a>\n    <a href="http://stackoverflow.com/users/2733488/topheman" title="@topheman on stackoverflow"><img alt="@topheman on stackoverflow" src="https://img.shields.io/badge/-stackoverflow-f48024?style=flat-square&logo=stackoverflow&logoColor=white"></a>\n</p>\n<p align="center">\n    <a href="http://labs.topheman.com" title="My projects"><img alt="My projects" src="https://img.shields.io/badge/-My%20Projects-900000?style=for-the-badge&logo=code&logoColor=white"></a>\n    <a href="https://topheman.github.io/talks/" title="My talks"><img alt="My talks" src="https://img.shields.io/badge/-My%20talks-FF0000?style=for-the-badge&logo=youtube&logoColor=white"></a>\n</p>\n\n<details>\n<summary>Click for GitHub Stats</summary>\n  <p align="center"><img alt="GitHub Stats" src="https://github-readme-stats.vercel.app/api?username=topheman&show_icons=true&hide=contribs&icon_color=000000&hide_border=true">\n</p>\n</details>\n';
