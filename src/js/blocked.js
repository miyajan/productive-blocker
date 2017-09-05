(function() {
    window.onload = () => {
        const beforeUrl = new URL(location.href).searchParams.get('url');
        const linkEl = document.createElement('a');
        linkEl.href = beforeUrl;
        linkEl.textContent = beforeUrl;
        document.getElementById('blocked-url').appendChild(linkEl);
    };
}());
