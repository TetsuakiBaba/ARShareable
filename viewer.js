window.addEventListener('load', function (e) {
    var url = new URL(window.location.href);
    var params = url.searchParams;
    console.log(params.get('id'));
    document.querySelector("#link_to_model").href = "./uploads/" + params.get('id');

    let file_type = params.get('id').split('.').pop();
    if (file_type == 'usdz') {
        document.querySelector("#message").innerHTML += 'Tap to View (iOS)';
    }
})
