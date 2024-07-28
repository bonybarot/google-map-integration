import images from '../assets/images';
import strings from '../i18n/strings';

export const mapKey = 'AIzaSyBTIGmWGYg5NTvnnYTs-ti7USNBSo-jCqU';

export const OnBoardingSlide = [
  {
    text: 'We provide high quality products just for you',
    image: images.onBordingImg1,
    id: 1,
  },
  {
    text: 'Your satisfaction is our number one priority',
    image: images.onBordingImg2,
    id: 2,
  },
  {
    text: "Let's fulfill your daily needs with Evone right now!",
    image: images.onBordingImg3,
    id: 3,
  },
];

export const hotelTypes = [
  {
    name: strings.resortHotel,
    value: 'Resort Hotel',
    image: images.ResortHotel,
  },
  {
    name: strings.businessHotel,
    value: 'Business Hotel',
    image: images.Bussinesshotel,
  },
  {
    name: strings.airportHotel,
    value: 'Airport Hotel',
    image: images.AirportHotel,
  },
  {
    name: strings.suiteHotel,
    value: 'Suite Hotel',
    image: images.SuitHotel,
  },
  {
    name: strings.boutiqueHotel,
    value: 'Boutique Hotel',
    image: images.BoutiqueHotel,
  },
  {
    name: strings.heritageHotel,
    value: 'Heritage Hotel',
    image: images.HeritageHotel,
  },
];

export const hostelTypes = [
  {
    name: strings.mixRoomHostel,
    value: 'Mix Room (all genders)',
    image: images.ResortHotel,
  },
  {
    name: strings.FemaleonlyHostel,
    value: 'Female only',
    image: images.Bussinesshotel,
  },
  {
    name: strings.MenOnlyHostel,
    value: 'Men Only',
    image: images.AirportHotel,
  },
  {
    name: strings.suiteHostel,
    value: 'Private Cabins',
    image: images.SuitHotel,
  },
  {
    name: strings.boutiqueHostel,
    value: 'Double rooms (larger private room with 1 bed)',
    image: images.BoutiqueHotel,
  },
  {
    name: strings.heritageHostel,
    value: 'Twin rooms ( private room with two single beds)',
    image: images.HeritageHotel,
  },
];
export const LandTypes = [
  {
    name: strings.Agriculture,
    value: 'Agriculture',
    image: images.HeritageHotel,
  },
  {
    name: strings.Commercial,
    value: 'Commercial',
    image: images.HeritageHotel,
  },
  {
    name: strings.Residential,
    value: 'Residential',
    image: images.HeritageHotel,
  },
  {
    name: strings.Recreational,
    value: 'Recreational',
    image: images.HeritageHotel,
  },
  {
    name: strings.Transport,
    value: 'Transport',
    image: images.HeritageHotel,
  },
];
export const hostelCategory = [
  {
    name: strings.budgetHostel,
    value: 'Budget Hostel',
    image: images.ResortHotel,
  },
  {
    name: strings.partyHostel,
    value: 'Party Hostel',
    image: images.Bussinesshotel,
  },
  {
    name: strings.airportHostel,
    value: 'Airport Hostel',
    image: images.AirportHotel,
  },
  {
    name: strings.suiteHostel,
    value: 'Suite Hostel',
    image: images.SuitHotel,
  },
  {
    name: strings.boutiqueHostel,
    value: 'Boutique Hostel',
    image: images.BoutiqueHotel,
  },
  {
    name: strings.familyHostel,
    value: 'Family Hostel',
    image: images.HeritageHotel,
  },
];

export const languages = [
  {
    value: 'en',
    name: 'English',
  },
  {
    value: 'zh-cn',
    name: 'Chinese',
  },
  {
    value: 'hi',
    name: 'Hindi',
  },
  {
    value: 'es',
    name: 'Spanish',
  },
  {
    value: 'ar-ae',
    name: 'Arabic',
  },
  {
    value: 'fr',
    name: 'French',
  },
  {
    value: 'it',
    name: 'Italian',
  },
  {
    value: 'ru',
    name: 'Russian',
  },
  {
    value: 'pt',
    name: 'Portuguese',
  },
  {
    value: 'ja',
    name: 'Japanese',
  },
];

export const allGender = [
  {
    value: 'male',
    label: strings.male,
  },
  {
    value: 'female',
    label: strings.female,
  },
  {
    value: 'other',
    label: strings.other,
  },
];

export const facilities = [
  {
    name: strings.parkinglot,
    image: images.parkingicon,
    translatedName: strings.parking,
  },
  {
    name: strings.meetingRoom,
    image: images.MeetingRoomIcon,
    translatedName: strings.meetingRoom,
  },
  {
    name: strings.elevator,
    image: images.ElevatorIcon,
    translatedName: strings.elevator,
  },
  {
    name: strings.gym,
    image: images.GYMIcon,
    translatedName: strings.gym,
  },
  {
    name: strings.wifi,
    image: images.WifiIcon,
    translatedName: strings.wifi,
  },
  {
    name: strings.swimmingPool,
    image: images.SwimmingpoolIcon,
    translatedName: strings.swimmingPool,
  },
  {
    name: strings.restraunt,
    image: images.RestrauntIcon,
    translatedName: strings.restraunt,
  },
  {
    name: strings.TwentyFourHrs,
    image: images.TwentyFourHrsIcon,
    translatedName: strings.TwentyFourHrs,
  },
];

export const roomTypes = [
  {
    value: 'Single Room',
    label: strings.singleRoom,
  },
  {
    value: 'Double Room',
    label: strings.doubleRooms,
  },
  {
    value: 'Twin Room',
    label: strings.twinRoom,
  },
  {
    value: 'Triple Room',
    label: strings.tripleRoom,
  },
  {
    value: 'Family Room',
    label: strings.familyRoom,
  },
  {
    value: 'Suite',
    label: strings.suite,
  },
  {
    value: 'Connecting Rooms',
    label: strings.connectingRooms,
  },
  {
    value: 'Executive Room',
    label: strings.executiveRoom,
  },
  {
    value: 'Honeymoon Suite',
    label: strings.honeymoonSuite,
  },
  {
    value: 'Accessible Room',
    label: strings.accessibleRoom,
  },
];

export const bedTypes = [
  {
    value: 'Bed-1',
    label: strings.bed1,
  },
  {
    value: 'Bed-2',
    label: strings.bed2,
  },
  {
    value: 'Bed-3',
    label: strings.bed3,
  },
];

export const getCountString = (count: number) => {
  return count;
};

export const getPlanImageByName = (planName: string) => {
  switch (planName) {
    case 'JUBILEE':
      return images.JubleeMedal;
    case 'BRONZE':
      return images.BronzeMedal;
    case 'SILVER':
      return images.SilverMedal;
    case 'DIAMOND':
      return images.DimondMedal;
    case 'GOLD':
      return images.GoldMedal;
    case 'PLATINUM':
      return images.PlatinumMedal;
    default:
      return images.JubleeMedal;
  }
};

export enum IBookingStatus {
  PENDING = 'Pending',
  PAYMENT_SUCCESS = 'Payment Success',
  PAYMENT_FAILED = 'Payment Failed',
  BOOKING_SUCCESS = 'Success',
  BOOKING_ACCEPT = 'Accepted',
  BOOKING_REJECTED = 'Rejected',
  BOOKING_CANCELLED = 'Cancelled',
  BOOKING_COMPLETED = 'Completed',
}

export const statusForButtonInVendor = ['Payment Success'];

export const statusForButtonInVendorLand = ['Payment', 'Pending'];

export const StatusForView = ['Rejected', 'Cancelled', 'Pending'];

export enum IModuleType {
  HOTEL = 'Hotel',
  SUBSCRIPTION = 'subscription',
  HOSTEL = 'Hostel',
  LAND = 'Land',
}

export const LabelForSchedule = {
  Monthly: 'Months',
  Yearly: 'Years',
  'Six Monthly': 'Half Years',
  Quarterly: 'Quarters',
};

export enum IMessageType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document',
}
