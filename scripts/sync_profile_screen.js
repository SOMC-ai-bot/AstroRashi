const fs = require('fs');
const path = require('path');

const profilePath = path.join(__dirname, '..', 'components', 'profile', 'ProfileScreen.tsx');
let profileContent = fs.readFileSync(profilePath, 'utf8');

const targetState = `  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [gender, setGender] = useState(user.gender || 'Male');
  const [birthDate, setBirthDate] = useState(user.birthDate);
  const [birthTime, setBirthTime] = useState(user.birthTime);
  const [birthPlace, setBirthPlace] = useState(user.birthPlace);
  const [latitude, setLatitude] = useState(user.latitude || 28.6139);
  const [longitude, setLongitude] = useState(user.longitude || 77.209);
  const [timezone, setTimezone] = useState(user.timezone || 'Asia/Kolkata');`;

const replacementState = `  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [gender, setGender] = useState(user.gender || 'Male');
  const [birthDate, setBirthDate] = useState(user.birthDate);
  const [birthTime, setBirthTime] = useState(user.birthTime);
  const [birthPlace, setBirthPlace] = useState(user.birthPlace);
  const [latitude, setLatitude] = useState(user.latitude || 28.6139);
  const [longitude, setLongitude] = useState(user.longitude || 77.209);
  const [timezone, setTimezone] = useState(user.timezone || 'Asia/Kolkata');

  // Keep local inputs synchronized if user profile updates externally
  React.useEffect(() => {
    setName(user.name || '');
    setEmail(user.email || '');
    setPhone(user.phone || '');
    setGender(user.gender || 'Male');
    setBirthDate(user.birthDate || '');
    setBirthTime(user.birthTime || '');
    setBirthPlace(user.birthPlace || '');
    setLatitude(user.latitude || 28.6139);
    setLongitude(user.longitude || 77.209);
    setTimezone(user.timezone || 'Asia/Kolkata');
  }, [user.name, user.email, user.phone, user.gender, user.birthDate, user.birthTime, user.birthPlace, user.latitude, user.longitude, user.timezone]);`;

const targetSave = `  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserBirthDetails({
      name,
      birthDate,
      birthTime,
      birthPlace,
      latitude,
      longitude,
      timezone,
      gender,
    });
    updateUserProfile({
      name,
      email,
      phone,
      gender,
      birthDate,
      birthTime,
      birthPlace,
      latitude,
      longitude,
      timezone,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2400);
  };`;

const replacementSave = `  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim() || user.name || 'User';
    updateUserProfile({
      name: cleanName,
      email: email.trim(),
      phone: phone.trim(),
      gender,
      birthDate,
      birthTime,
      birthPlace,
      latitude,
      longitude,
      timezone,
    });
    updateUserBirthDetails({
      name: cleanName,
      birthDate,
      birthTime,
      birthPlace,
      latitude,
      longitude,
      timezone,
      gender,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2400);
  };`;

const normalized = profileContent.replace(/\r\n/g, '\n');
let updated = normalized;

if (!normalized.includes(targetState)) {
  console.error("targetState not found");
  process.exit(1);
}
updated = updated.replace(targetState, replacementState);

if (!updated.includes(targetSave)) {
  console.error("targetSave not found");
  process.exit(1);
}
updated = updated.replace(targetSave, replacementSave);

fs.writeFileSync(profilePath, updated, 'utf8');
console.log('Successfully updated ProfileScreen.tsx');

