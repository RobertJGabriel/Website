// SVG path definitions for map markers
var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";
var planeSVG = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";

// Travel destinations data
var destinations = [
  { title: "Ireland", latitude: 53.1424, longitude: -7.6921 },
  { title: "Austin, TX", latitude: 30.2672, longitude: -97.7431 },
  { title: "Hot Springs, AR", latitude: 34.5037, longitude: -93.0552 },
  { title: "New York City, NY", latitude: 40.730610, longitude: -73.935242 },
  { title: "Milan, Italy", latitude: 45.4642, longitude: -9.1900 },
  { title: "Madrid, Spain", latitude: 40.4168, longitude: -3.7038 },
  { title: "Paris, France", latitude: 46.2276, longitude: -2.2137 },
  { title: "Toronto, Canada", latitude: 43.6532, longitude: -79.3832 },
  { title: "San Francisco, CA", latitude: 37.773972, longitude: -122.431297 },
  { title: "Edinburgh, Scotland", latitude: 55.953251, longitude: -3.188267 },
  { title: "Fulham, London", latitude: 51.478710, longitude: -0.201702 },
  { title: "Saint Louis, MO", latitude: 38.627003, longitude: -90.199402 },
  { title: "Nederland, TX", latitude: 29.974380, longitude: -93.992397 }
];

// Extract coordinates for flight paths
var latitudes = destinations.map(dest => dest.latitude);
var longitudes = destinations.map(dest => dest.longitude);

// Create images array with proper SVG markers
var images = destinations.map(dest => ({
  svgPath: targetSVG,
  title: dest.title,
  latitude: dest.latitude,
  longitude: dest.longitude,
  scale: 1,
  color: "#585869",
  rollOverColor: "#FF6B6B",
  selectedColor: "#4ECDC4"
}));

// Add animated planes
images.push(
  {
    svgPath: planeSVG,
    positionOnLine: 0,
    color: "#000000",
    alpha: 0.1,
    animateAlongLine: true,
    lineId: "line2",
    flipDirection: true,
    loop: true,
    scale: 0.03,
    positionScale: 1.3,
  },
  {
    svgPath: planeSVG,
    positionOnLine: 0,
    color: "#585869",
    animateAlongLine: true,
    lineId: "line1",
    flipDirection: true,
    loop: true,
    scale: 0.03,
    positionScale: 1.8,
  }
);

// Initialize the map
var map = AmCharts.makeChart("chartdiv", {
  type: "map",
  theme: "light",
  projection: "mercator",
  
  dataProvider: {
    map: "worldLow",
    zoomLevel: 1.4,
    zoomLongitude: -10,
    zoomLatitude: 20,
    
    lines: [
      {
        id: "line1",
        arc: -0.85,
        alpha: 0.3,
        latitudes: latitudes,
        longitudes: longitudes,
        color: "#585869"
      },
      {
        id: "line2",
        alpha: 0,
        color: "#000000",
        latitudes: latitudes,
        longitudes: longitudes,
      },
    ],
    
    images: images,
  },
  
  areasSettings: {
    unlistedAreasColor: "#f0f9ff",
    unlistedAreasAlpha: 1,
    rollOverOutlineColor: "#0ea5e9",
    rollOverColor: "#e0f2fe",
    selectedColor: "#bae6fd",
    color: "#f0f9ff",
    outlineColor: "#e2e8f0",
    outlineThickness: 0.5
  },
  
  imagesSettings: {
    color: "#585869",
    rollOverColor: "#FF6B6B",
    selectedColor: "#4ECDC4",
    pauseDuration: 0.2,
    animationDuration: 2.5,
    adjustAnimationSpeed: true,
    rollOverScale: 1.2,
    selectedScale: 1.3
  },
  
  linesSettings: {
    color: "#585869",
    alpha: 0.4,
    thickness: 2,
    rollOverColor: "#FF6B6B",
    rollOverAlpha: 0.6
  },
  
  export: {
    enabled: true,
    position: "top-right",
    libs: {
      path: "https://www.amcharts.com/lib/3/plugins/export/libs/"
    }
  },
  
  listeners: [{
    event: "init",
    method: function(e) {
      // Update travel stats when map loads
      updateTravelStats();
    }
  }]
});

// Function to update travel statistics
function updateTravelStats() {
  try {
    const countriesCount = getUniqueCountries(destinations).length;
    const totalMiles = calculateApproximateDistance(destinations);
    
    // Update DOM elements if they exist
    const countriesElement = document.getElementById('countries-count');
    const milesElement = document.getElementById('miles-count');
    const conferencesElement = document.getElementById('conferences-count');
    
    if (countriesElement) {
      countriesElement.textContent = countriesCount;
    }
    if (milesElement) {
      milesElement.textContent = formatNumber(totalMiles) + 'K+';
    }
    if (conferencesElement) {
      conferencesElement.textContent = '15+'; // You can update this based on actual data
    }
    
    console.log(`Travel Stats Updated: ${countriesCount} countries, ~${totalMiles}K miles`);
  } catch (error) {
    console.error('Error updating travel stats:', error);
  }
}

// Helper function to get unique countries from destinations
function getUniqueCountries(destinations) {
  const countries = destinations.map(dest => {
    // Extract country from title (this is a simplified approach)
    if (dest.title.includes('Ireland')) return 'Ireland';
    if (dest.title.includes('Italy')) return 'Italy';
    if (dest.title.includes('Spain')) return 'Spain';
    if (dest.title.includes('France')) return 'France';
    if (dest.title.includes('Canada')) return 'Canada';
    if (dest.title.includes('Scotland')) return 'United Kingdom';
    if (dest.title.includes('London')) return 'United Kingdom';
    return 'United States'; // Default for US cities
  });
  
  return [...new Set(countries)];
}

// Helper function to calculate approximate total distance
function calculateApproximateDistance(destinations) {
  // Simplified calculation - in a real app you'd use proper distance formulas
  const baseDistance = destinations.length * 800; // Rough estimate per destination
  return Math.round(baseDistance / 1000); // Convert to thousands
}

// Helper function to format numbers
function formatNumber(num) {
  if (num >= 1000) {
    return Math.round(num / 1000);
  }
  return num;
}

// Add responsive behavior
function handleResize() {
  if (map && map.invalidateSize) {
    map.invalidateSize();
  }
}

// Listen for window resize
if (typeof window !== 'undefined') {
  window.addEventListener('resize', handleResize);
}