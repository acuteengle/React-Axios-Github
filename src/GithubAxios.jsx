import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BarChart from './BarChart';

const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const getNColors = (n) => {
    let colors = [];
    for (var i = 0; i < n; i ++){
        colors.append(getRandomColor());
    }
    return colors;
}

const GithubAxios = () => {

    const [commits, setCommits] = useState([]);

    useEffect(() => {

        const owner = "bitcoin";
        const repo = "bitcoin";

        // https://developer.github.com/v3/repos/commits/#list-commits
        axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`)
        .then(res => {
            console.log(res);
            const data = res.data;
            setCommits(data);
        });
    }, []);

    const committers = new Map();
    for (var c of commits){
        let author = c.commit.author.name;
        if (committers.has(author)){
            committers.set(author, committers.get(author)+1);
        }
        else {
            committers.set(author, 1);
        }
    }

    const keys = Array.from(committers.keys())

    const data = {
        name: "all_data",
        children: []
    };

    for (var k of keys){
        let entry = {
            name: k,
            value: committers.get(k)
        };
        data.children.push(entry);
    }

    return (
        <div>
            <table>
                <tbody>
                    {   
                        // https://stackoverflow.com/questions/43885365/using-map-on-an-iterator
                        keys.map((k) => {
                            return (
                                <tr key={k}>
                                    <td>{k}</td>
                                    <td>{committers.get(k)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <hr/>
            <BarChart committers={committers}/>
            <hr/>
            <table>
                <tbody>
                    {
                        commits.map(c => {
                            let author = c.commit.author.name;
                            let date = c.commit.author.date;
                            let message = c.commit.message;
                            return (
                                <tr key={date}>
                                    <td>{author}</td>
                                    <td>{date}</td>
                                    <td>{message}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default GithubAxios;