# HTML5 AudioEncoder and AudioDecoder
This package provides a simple way to encode and decode audio using the HTML5 AudioEncoder and AudioDecoder APIs. It is written in JavaScript and can be used in any project that requires audio encoding or decoding.

## Installation
To use this package, you'll need to install it using npm or yarn:


``npm install @mastashake08/shake-audio``
or


``yarn add @mastashake08/shake-audio``
## Usage
### Encoding audio
To encode an audio buffer, you'll first need to create an instance of the AudioEncoder class. Then, you can call the encode method on the instance, passing in the audio buffer you want to encode and the MIME type you want to encode it as:


```

import { AudioEncoder } from '@mastashake08/shake-audio';
const audioBuffer = ...; // create or load an audio buffer
const mimeType = 'audio/mpeg'; // choose a MIME type for the encoded audio
const encoder = new AudioEncoder();
const encodedBuffer = await encoder.encode(audioBuffer, mimeType);

```

The encode method returns a promise that resolves to an array buffer containing the encoded audio data.

### Decoding audio
To decode an audio buffer, you'll first need to create an instance of the AudioDecoder class. Then, you can call the decode method on the instance, passing in the array buffer containing the encoded audio data:

```
import { AudioDecoder } from '@mastashake08/shake-audio';

const encodedBuffer = ...; // load the encoded audio data
const decoder = new AudioDecoder();
const audioBuffer = await decoder.decode(encodedBuffer);
```

The decode method returns a promise that resolves to an audio buffer.

## Examples
Here's a simple example that shows how to use this package to encode and decode audio:


```
import { AudioEncoder, AudioDecoder } from '@mastashake08/shake-audio';

async function encodeAndDecode() {
  const audioBuffer = ...; // create or load an audio buffer
  const mimeType = 'audio/mpeg'; // choose a MIME type for the encoded audio

  // Encode the audio buffer
  const encoder = new AudioEncoder();
  const encodedBuffer = await encoder.encode(audioBuffer, mimeType);

  // Decode the encoded buffer
  const decoder = new AudioDecoder();
  const decodedBuffer = await decoder.decode(encodedBuffer);

  // Log the result to the console
  console.log(decodedBuffer);
}
encodeAndDecode();
```

This example encodes an audio buffer using the AudioEncoder class, then decodes the encoded buffer using the AudioDecoder class. Finally, it logs the decoded audio buffer to the console.
