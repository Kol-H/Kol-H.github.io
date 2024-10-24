/**  create new elements for each repo: 
 *     h2    name
 *     p     desc
 *     li    created/updated/commits
 *     li    languages
 *     h6    watchers 
 *     img   github-icon

 *   append them into 
 *     div   repo-card
 *   
 *   append that into 
 *     main (flex)
 * 
 *   have searchbar in header that calls getRepos with its value on btn-click
 */
var main = document.getElementsByTagName("main")[0];

var ghub = document.createElement("img");
ghub.src = "github.svg";


// get all repos from username
const getRepos = async (username) => {
    try {
        const repositories = await fetch('https://api.github.com/users/' + username + '/repos', {
            method: 'GET',
            headers: {
                'authorization': 'AUTH',
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        const data = await repositories.json();
        return {data};
    } catch (error) {
        console.error('Error fetching languages:', error);
    }
    
}

//get all languages for each repo
const getLangs = async (repos) => {
    for (var i = 0; i < repos.data.length; i++) {
        try {
            const languages = await fetch(repos.data[i].languages_url, {
                method: 'GET',
                headers: {
                    'authorization': 'AUTH',
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            repos.data[i].languages = await languages.json();
        } catch (error) {
            console.error('Error fetching languages:', error);
        }
    }

    return {repos}
}

//get num commits for each repo
const getCommits = async (repos) => {
    for (var i = 0; i < repos.repos.data.length; i++) {
        try {
            const fetchCommits = await fetch(repos.repos.data[i].commits_url.substring(0, repos.repos.data[i].commits_url.length - 6), {
                method: 'GET',
                headers: {
                    'authorization': 'AUTH',
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            var allCommits = await fetchCommits.json();
            repos.repos.data[i].commits_count = allCommits.length;
        } catch (error) {
            console.error('Error fetching languages:', error);
        }
    }

    return {repos}
}

//get the repos themselves
function createCards(username) {
    const cc = getRepos(username).then((result) => {
        
        //get lists of languages for each repo
        const l = getLangs(result).then((r) => {
            //get commit count for each repo
            const c = getCommits(r).then((res) => {
                const repos = res.repos.repos.data;

                for (var i = 0; i < repos.length; i++) {
                    var card = document.createElement("div");
                    card.classList.add("card");
                    var cardHeader = document.createElement("div");
                    cardHeader.classList.add("card-header");

                    var title = document.createElement("h2");
                    var desc = document.createElement("p");

                    var cucw = document.createElement("ul"); //created/updated/commits
                    var created = document.createElement("li");
                    var updated = document.createElement("li");
                    var commits = document.createElement("li");
                    var watchers = document.createElement("li");

                    var languages = document.createElement("ul"); //make this horizontal
                    languages.classList.add("languages");
                    var lang = document.createElement("li");

                    title.value = repos[i].name;
                    desc.value = repos[i].description;
                    created.innerHTML = "<b>Created:</b> " + repos[i].created_at;
                    updated.innerHTML = "<b>Updated:</b> " + repos[i].updated_at;
                    commits.innerHTML = "<b>Commits:</b> " + repos[i].commits_count;
                    watchers.innerHTML = "<b>Watchers:</b> " + repos[i].watchers_count;
                    for (var j = 0; j < Object.keys(repos[i].languages).length; j++) {
                        lang.innerText = Object.keys(repos[i].languages)[j];
                        languages.appendChild(lang);
                    }

                    cucw.appendChild(created);
                    cucw.appendChild(updated);
                    cucw.appendChild(commits);
                    cucw.appendChild(watchers);

                    cardHeader.appendChild(ghub)
                    cardHeader.appendChild(title);

                    card.appendChild(cardHeader);
                    card.appendChild(desc);
                    card.appendChild(cucw);
                    card.appendChild(languages);

                    main.appendChild(card);
                }
            });
        });
    });
}


createCards("Kol-H");

var search = document.getElementById("search");
var user = document.getElementById("username");
search.addEventListener("click", function() {
    createCards(user.value);
})