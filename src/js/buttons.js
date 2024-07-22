export function createPinButton(task, pinTask) {
    const pinButton = document.createElement('button');
    pinButton.className = 'button pin-btn';
    pinButton.addEventListener('click', () => pinTask(task));

    return pinButton;
}

export function createUnpinButton(task, unpinTask) {
    const unpinButton = document.createElement('button');
    unpinButton.className = 'button unpin-btn';
    unpinButton.addEventListener('click', () => unpinTask(task));

    return unpinButton;
}