console.log("IT’S ALIVE!");

function $$ (selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

const ARE_WE_HOME = document.documentElement.classList.contains("Home");

let navLinks = $$("nav a");
let currentLink = navLinks.find(a => a.host === location.host && a.pathname === location.pathname);
if (currentLink){
    currentLink.classList.add("current");
}
let pages = [   
    {url: ".", title: "Home"},
    {url: "projects", title: "Projects"},
    {url: "resume", title: "Resume"},
    {url: "contact", title: "Contact"}
]

let nav = document.createElement("nav");
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;

    let a = document.createElement("a");
    a.href = url;
    a.textContent = title;
    
    // Create link and add it to nav
    // if (!ARE_WE_HOME && !url.startsWith("http")) {
    //     url = "../" + url;
    // }
    // nav.insertAdjacentHTML("beforeend", `<a href="${ url }">${ title }</a>` );
    nav.append(a);
}
