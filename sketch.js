var g_uploaded_filename;
var myModal;
var qrCode;

window.addEventListener('load', function (e) {
    console.log(window.location.href);
    myModal = new bootstrap.Modal(document.getElementById('myModal'), {
        backdrop: false,
        keyboard: false,
        focus: true
    });



})

function copySharingLink() {
    document.querySelector("#sharing_link").select();
    document.execCommand('copy');
}

function downloadQR() {
    qrCode.download({ name: "qr", extension: "png" });
}

Dropzone.autoDiscover = false;

var myDropzone = new Dropzone(".dropzone", {
    autoProcessQueue: true,
    acceptedFiles: '.usdz,.gltf,.glb',
    maxFilesize: 20,
    parallelUploads: 1, // Number of files process at a time (default 2)
    init: function () {
        this.on("complete", function (file) {
            if (file.status == 'error') {
                alert('許可されていないファイル形式です');
                this.removeFile(file);
                return;
            }
            // generate sharing link 
            let link = window.location.href + "viewer.html?id=" + g_uploaded_filename;
            document.querySelector("#sharing_link").value = link;

            // generate QR code
            qrCode = new QRCodeStyling({
                width: 300,
                height: 300,
                type: "svg",
                data: link,
                //image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
                dotsOptions: {
                    color: "#000000",
                    type: "rounded"
                },
                backgroundOptions: {
                    color: "#FFFFFF",
                },
                imageOptions: {
                    crossOrigin: "anonymous",
                    margin: 20
                }
            });
            let ele = document.querySelector('#canvas');
            while (ele.firstChild) {
                ele.removeChild(ele.firstChild);
            }
            qrCode.append(document.getElementById("canvas"));

            myModal.toggle();
        });
    },
    accept: function (file, done) {
        // get file type( usdg or gltf)
        let file_type = file.name.split('.').pop();

        var S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        var N = 32
        random_filename = Array.from(Array(N)).map(() => S[Math.floor(Math.random() * S.length)]).join('');
        random_filename += "." + file_type;
        g_uploaded_filename = random_filename;
        file.upload.filename = random_filename;
        done();
    }
});


function upload() {
    myDropzone.processQueue();
}

