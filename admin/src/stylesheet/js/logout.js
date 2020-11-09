$("#signOut").click(function () {
    localStorage.removeItem(localStorage.key('token'));
    localStorage.removeItem(localStorage.key('name'));

    location.reload();
});