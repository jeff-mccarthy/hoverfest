var hoverToggle = document.getElementById('hoverToggle');
var isChecked = hoverToggle.checked;

hoverToggle.addEventListener('change', function() {
  isChecked = this.checked;
  chrome.storage.local.set({isChecked: isChecked});

  sendMessage();
});

chrome.storage.local.get('isChecked', function(result) {
  if(result.isChecked) {
    hoverToggle.checked = true;
  } else {
    hoverToggle.checked = false;
  }
});

function sendMessage() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      isChecked: isChecked
    });
  });
}

sendMessage();
