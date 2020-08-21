import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import BarChart from "./BarChart";

const GithubAxios = () => {
  const [commits, setCommits] = useState([]);

  // can use these variable to change owner and repository
  const owner = "bitcoin";
  const repo = "bitcoin";

  async function asyncFunc() {
    // can use this variable to fetch more commits
    const numer_of_pages = 1;
    let page = 1;
    let total = [];
    while (page < numer_of_pages + 1) {
      const url = `https://api.github.com/repos/${owner}/${repo}/commits?page=${page}`;
      console.log(url);
      await axios
        .get(url)
        .then((res) => {
          console.log("data", res.data);
          total = total.concat(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      page++;
    }
    setCommits(total);
  }

  useEffect(() => {
    asyncFunc();
  }, []);

  // counts the number of commits per author
  const committers = new Map();
  for (var c of commits) {
    let author = c.commit.author.name;
    if (committers.has(author)) {
      committers.set(author, committers.get(author) + 1);
    } else {
      committers.set(author, 1);
    }
  }

  // formats data for D3 bar graph
  const keys = Array.from(committers.keys());
  const data = {
    name: "all_data",
    children: [],
  };
  for (var k of keys) {
    let entry = {
      name: k,
      value: committers.get(k),
    };
    data.children.push(entry);
  }

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>Owner: {owner}</h2>
      <h2 style={{ textAlign: "center" }}>Repository: {repo}</h2>
      <table className="table table-dark">
        <caption>Last 30 commits</caption>
        <thead>
          <tr>
            <th scope="col">Developer</th>
            <th scope="col">Commits</th>
          </tr>
        </thead>
        <tbody>
          {
            // https://stackoverflow.com/questions/43885365/using-map-on-an-iterator
            keys.map((k) => {
              return (
                <tr key={k}>
                  <td>{k}</td>
                  <td>{committers.get(k)}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
      <hr />
      <h3 style={{ textAlign: "center" }}>
        Bar Chart showing commits per person
      </h3>
      <BarChart committers={committers} />
      <hr />
      <h3 style={{ textAlign: "center" }}>Commits</h3>
      <table
        className="table table-dark"
        style={{ tableLayout: "fixed", width: "100%" }}
      >
        <caption>Last 30 commits</caption>
        <thead>
          <tr>
            <th scope="col">Developer</th>
            <th scope="col">Date</th>
            <th scope="col">Message</th>
          </tr>
        </thead>
        <tbody>
          {commits.map((c) => {
            let author = c.commit.author.name;
            let date = c.commit.author.date;
            let message = c.commit.message;
            return (
              <tr key={date}>
                <td>{author}</td>
                <td>{date}</td>
                <td>{message}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GithubAxios;
