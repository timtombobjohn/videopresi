from flask import Flask, render_template, jsonify
import vlc
import time
import keyboard
import mouse


app = Flask(__name__)

# Initialize VLC media player instance
# vlc_instance = vlc.Instance("--no-xlib")
vlc_instance = vlc.Instance()

media_player = vlc_instance.media_player_new()

# Define a route for the HTML page
@app.route("/")
def index():
    return render_template("kelter_index.html")

# Define a route to start playing the video
@app.route("/play_video")
def play_video():
    # Load the video file into the media player
    media = vlc_instance.media_new("kelter/wagnerHD.mp4")
    media_player.set_media(media)

    #set a hotkey to escape fullscreen
    # keyboard.add_hotkey("Esc", media_player.stop())

    # Set up fullscreen mode
    media_player.set_fullscreen(True)

    # Play the video
    media_player.play()

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

@app.route("/stop_video")
def stop_video():
    # Stop the video
    media_player.stop()

    # Return to the index page
    return redirect(url_for("index"))


if __name__ == "__main__":
    app.run(debug=True)

