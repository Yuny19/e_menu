$("#signOut").click(function () {
    localStorage.removeItem(localStorage.key('token'));
    localStorage.removeItem(localStorage.key('name'));
    localStorage.removeItem(localStorage.key('basket'));

    location.reload();
});