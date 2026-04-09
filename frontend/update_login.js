const fs = require('fs');
const file = 'c:\\Users\\Ujjwal kriti\\Desktop\\chatboat\\src\\pages\\Login.jsx';
let content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

const newLines = [
  ...lines.slice(0, 75), // Keep up to line 75 (index 0-74)
  '      {/* Background YouTube Video */}',
  '      <div className="absolute inset-0 z-0 overflow-hidden bg-black pointer-events-none">',
  '        <div className="absolute inset-0 bg-black/60 z-10"></div> {/* Dark Overlay for readability */}',
  '        ',
  '        {/* Video Frame */}',
  '        <iframe',
  '          className="absolute top-1/2 left-1/2 w-[250vw] h-[250vh] md:w-[150vw] md:h-[150vh] -translate-x-1/2 -translate-y-1/2"',
  '          src="https://www.youtube.com/embed/eGPi6TNNgU8?autoplay=1&mute=1&loop=1&playlist=eGPi6TNNgU8&controls=0&showinfo=0&rel=0&modestbranding=1"',
  '          title="Vignan University Background Video"',
  '          frameBorder="0"',
  '          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"',
  '          allowFullScreen',
  '        ></iframe>',
  '      </div>',
  ...lines.slice(104) // Keep from line 105 onwards to ensure we are aligned with the end tag
];

fs.writeFileSync(file, newLines.join('\n'));
