export class RestCountriesProvider {
    async fetchCountry(alpha3: string) {
      const url = `https://restcountries.com/v3.1/alpha/${alpha3}?fields=name,cca3,region,subregion,capital,population,flags`;
  
      try {
        const resp = await fetch(url);
        if (!resp.ok) return null;
  
        const data = await resp.json();
        const entry = Array.isArray(data) ? data[0] : data;
  
        return {
          alpha3Code: entry.cca3,
          name: entry.name?.common ?? '',
          region: entry.region ?? '',
          subregion: entry.subregion ?? '',
          capital: entry.capital?.[0] ?? '',
          population: entry.population ?? 0,
          flag: entry.flags?.svg ?? entry.flags?.png ?? '',
        };
      } catch {
        return null;
      }
    }
  }
  