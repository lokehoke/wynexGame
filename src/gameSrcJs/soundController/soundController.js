'use strict';

module.exports = class SoundController {
    constructor() {
        this.soundWrapper = document.getElementById('sounds');
    }

    doMainMenuMusic() {
        this._emptySound();
        this._createAudioTeg({
            auto: true,
            src: '/resources/sounds/mainMenu/1.wav'
        });
    }

    _emptySound() {
        while(this.soundWrapper.firstChild) {
            this.soundWrapper.firstChild.remove();
        }
        return true;
    }

    _createAudioTeg(config) {
        let audio = document.createElement('audio');

        if (config.auto) {
            audio.autoplay = 'autoplay';
            audio.loop = 'loop';
        }

        audio.src = config.src;
        this.soundWrapper.appendChild(audio);
        return true;
    }
}
