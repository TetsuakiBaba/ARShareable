window.addEventListener('load', function (e) {
    var url = new URL(window.location.href);
    var params = url.searchParams;
    let file_type = params.get('id').split('.').pop();

    if (file_type == 'usdz') {
        document.querySelector("#link_to_model").href = "./uploads/" + params.get('id');
        document.querySelector("#message").innerHTML += 'Tap to View (iOS)';
        document.querySelector("#usdz").hidden = false;
    }
    else if (file_type == 'glb') {
        document.querySelector('model-viewer').setAttribute('src', "./uploads/" + params.get('id'));
        document.querySelector("#glb_message").innerHTML += 'Tap to View (Android and iOS)';
        document.querySelector("#glb").hidden = false;
    }
})
