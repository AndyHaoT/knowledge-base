function toggleComments(post_id) {
    let display_type = document.getElementById(post_id).style.display;

    if (display_type == 'block')
        document.getElementById(post_id).style.display = 'none'
    else
        document.getElementById(post_id).style.display = 'block'
}