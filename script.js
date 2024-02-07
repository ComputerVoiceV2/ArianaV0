document.getElementById('speak').addEventListener('click', function() {
    var msg = new SpeechSynthesisUtterance();
    msg.text = document.getElementById('text').value;
    window.speechSynthesis.speak(msg);
});

let chunks = [];
let mediaRecorder;

document.getElementById('record').addEventListener('click', function() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            console.log('Recording started');
            document.getElementById('recordingStatus').textContent = 'Recording...';
            document.getElementById('stop').disabled = false;
            mediaRecorder.ondataavailable = function(e) {
                chunks.push(e.data);
            };
        })
        .catch(function(err) {
            console.log('The following error occurred: ' + err);
        });
});

document.getElementById('stop').addEventListener('click', function() {
    if (mediaRecorder) {
        mediaRecorder.stop();
        console.log('Recording stopped');
        document.getElementById('recordingStatus').textContent = 'Recording stopped.';
        document.getElementById('stop').disabled = true;
        const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
        chunks = [];
        const audioURL = window.URL.createObjectURL(blob);
        console.log(audioURL); // You can use this URL to play the audio or save it.
    } else {
        console.log('No mediaRecorder instance found');
    }
});
