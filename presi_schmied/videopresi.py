import threading
import webbrowser
from flask import Flask, render_template, jsonify, request
import vlc
import time
import keyboard
import mouse

app = Flask(__name__)

# Initialize VLC media player instance
vlc_instance = vlc.Instance()

media_player = vlc_instance.media_player_new()

# Define a route for the HTML page
@app.route("/")
def index():
    return render_template("index.html")

# Define a route to start playing the video
@app.route("/play_video")
def play_video():
    videoURL = request.args.get("ID")
    # Load the video file into the media player
    media = vlc_instance.media_new(videoURL)
    media_player.set_media(media)

    #set a hotkey to escape fullscreen
    keyboard.add_hotkey("Esc", media_player.stop())

    # Set up fullscreen mode
    media_player.set_fullscreen(True)

    # Play the video
    media_player.play()

    time.sleep(3) #verhindern von doppelklicks

    # Wait for the video to finish playing or be stopped by user
    while True:
        if media_player.get_state() == vlc.State.Ended or media_player.get_state() == vlc.State.Stopped:
            break
        if keyboard.is_pressed("q"):
            break
        if mouse.is_pressed("left"):
            break
        time.sleep(0.1)

    # Stop the player and return success response
    media_player.stop()
    return jsonify(success=True)


if __name__ == "__main__":
    app.run()
