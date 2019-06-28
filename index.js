function openMenu() {
  document.getElementById("sidebar").style.width = "200px";
}

function closeMenu() {
  document.getElementById("sidebar").style.width = "0";

}


function scrolltTop() {

  document.getElementById("top").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}

function scrollAboutMe() {

  document.getElementById("aboutMe").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}
// function scrollAbilities() {
//
//   document.getElementById("top").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
// }
//
// function scrollProjects() {
//
//   document.getElementById("top").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
// }
