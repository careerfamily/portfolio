/**
 * Creates an onscroll function that observes sections and sets .active on links
 *
 * @param sections NodeList/Array of sections on page to observe during scrolling, must have id atttribute
 * @param links_to_sections NodeList/Array of links to add/remove .active to during section; links must contain anchor
 * @param shift_up_px amount of pixels to shift section start/end by; show sections sooner
 * @returns {on_scroll} event function for window.onscroll
 */
function onscrollHighLightSections(sections, links_to_sections, shift_up_px=200) {
    sections = Array.from(sections);
    links_to_sections = Array.from(links_to_sections);
    const fat_sections = sections.map((sec) => {
        // shift sections by X so new section shows sooner
        let sec_start= sec.offsetTop - shift_up_px;
        let sec_end= sec.offsetTop + sec.offsetHeight - shift_up_px;
        let id = sec.getAttribute('id');
        let link = links_to_sections.find((x) => x.href.includes(id));
        if (!link) { console.log("Unable to find scroll link for: "+id); }
        // let link= document.querySelector('header nav a[href*=' + id + ']');
        return [sec_start, sec_end, link];
    });
    let on_scroll = (_) => {
        let cur_pos = window.scrollY;
        fat_sections.every(([sec_start, sec_end, link]) => {
            // our section?
            if (sec_start < cur_pos && cur_pos < sec_end) {
                console.log("Section:: "+link.href.split("#")[1]+" "+sec_start+" < "+cur_pos+" < "+sec_end)
                links_to_sections.forEach(x => x.classList.remove('active'));
                if (link) {
                    link.classList.add('active');
                }
                // stop looking
                return false;
            }
            // keep looking
            return true;
        });
    };
    // handle page anchor links on page load by running now
    on_scroll();
    return on_scroll
}
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
window.addEventListener("scroll", onscrollHighLightSections(sections, navLinks));

/*========== Toggle Icon Navbar ==========*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('header');

menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});
function stickScroll(_event) {
    /*========== Sticky Navbar ==========*/
    header.classList.toggle('sticky', window.scrollY > 100);

    /*========== Remove Toggle Icon and Navbar Scroll==========*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}
window.addEventListener("scroll", stickScroll);



/*========== Scroll Reveal ==========*/
ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .projects-container, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/*========== Typed JS ==========*/
let typed_text = document.querySelector('.multiple-text');
// empty initial value so it doesn't pop; initial value is for noScript folks
typed_text.innerHTML = "";
const typed = new Typed(typed_text, {
    strings: ['Administrative Assistant','Website Developer','Graphic Designer','Blogger','Mom'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});
