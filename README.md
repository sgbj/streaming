# Streaming

Proof of concept streaming platform using RTMP and HLS.

Built with ASP.NET Core, EF Core, SignalR, React, Chakra UI, NGINX, nginx-rtmp-module, FFmpeg, and Docker.

![Live channels](https://user-images.githubusercontent.com/5178445/136648527-5fcc1ad7-a576-471c-8afa-f0dd345bd6e1.png)

![Channel](https://user-images.githubusercontent.com/5178445/136648528-3dc3e8ca-7ba3-4926-9f5e-b5d82f05f1b7.png)

## How it works

This project uses the same protocols as Twitch. OBS connects to NGINX via RTMP and FFmpeg transcodes the stream into HLS, which gets served up by ASP.NET Core and React. Chat is powered by SignalR.

RTMP and HLS are older protocols, but they were chosen for this project because they're still used by popular streaming platforms. A better implementation might use RTSP or WebRTC.

## Resources

* https://blog.twitch.tv/en/2017/10/10/live-video-transmuxing-transcoding-f-fmpeg-vs-twitch-transcoder-part-i-489c1c125f28/
* https://www.youtube.com/watch?v=LsF5bHRxC_M&ab_channel=Demuxed
