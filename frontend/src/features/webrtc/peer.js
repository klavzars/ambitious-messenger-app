class Peer {
  constructor() {
    if (!this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
          },
        ],
      });
    }

    this.offer = null;
    this.targetPeer = null;
  }

  // at this stage there should have been an offer from the other peer stored
  async getAnswer() {
    if (this.peer) {
      await this.peer.setRemoteDescription(this.offer);
      const answer = await this.peer.createAnswer();
      await this.peer.setLocalDescription(answer);
      return answer;
    }
  }

  async getOffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(offer);
      return offer;
    }
  }

  async setLocalDescription(description) {
    if (this.peer) {
      await this.peer.setLocalDescription(description).then(() => console.log("set local description done"));
    }
  }

  async setRemoteDescription(description) {
    if (this.peer) {
      await this.peer.setRemoteDescription(description).then(() => console.log("set remote description done"));
    }
  }

  async addIceCandidate(candidate) {
    if (this.peer) {
      await this.peer.addIceCandidate(candidate);
    }
  }

  getStoredOffer() {
    return this.offer; // Retrieve the stored offer
  } //

  setStoredOffer(offer) {
    this.offer = offer; // Store the offer
  }

  setTargetPeer(targetPeer) {
    this.targetPeer = targetPeer;
  }

  getTargetPeer() {
    return this.targetPeer;
  }

  // ...
}

export default Peer;
