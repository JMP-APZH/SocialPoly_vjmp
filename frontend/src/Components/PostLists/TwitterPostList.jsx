import React from "react";

export default function TwitterPostList() {
  const [TwitterPosts, setTwitterPosts] = React.useState(false);

  useEffect(() => {
    async function getTwitterPosts() {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(
        `https://socialpoly.ch/backend/api/users/me/twitter/`,
        config
      );
      if (response.data) {
        setTwitterPosts(response.data);
      }
    }
    getTwitterPosts();
  }, []);
  return <div>Test</div>;
}
