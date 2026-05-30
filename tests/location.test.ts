import { describe, it, expect } from 'vitest';
import { getStates, getStateById, getStateByName, getLGAs, searchStates, searchLGAs } from '../src/index.js';

describe('Nigeria Location Kit - Core Logic', () => {
  it('should return exactly 37 states (36 states + FCT)', () => {
    const states = getStates();
    expect(states).toBeInstanceOf(Array);
    expect(states.length).toBe(37);
  });

  describe('getStateById', () => {
    it('should find Lagos by ID', () => {
      const state = getStateById('NG-LAG');
      expect(state).toBeDefined();
      expect(state?.name).toBe('Lagos');
    });

    it('should return undefined for invalid ID', () => {
      const state = getStateById('NG-INVALID');
      expect(state).toBeUndefined();
    });
  });

  describe('getStateByName', () => {
    it('should find state by exact name ignoring case', () => {
      const state = getStateByName('kAnO');
      expect(state).toBeDefined();
      expect(state?.id).toBe('NG-KAN');
    });
  });

  describe('getLGAs', () => {
    it('should get LGAs for a state by Name', () => {
      const lgas = getLGAs('Lagos');
      expect(lgas).toBeInstanceOf(Array);
      expect(lgas.length).toBeGreaterThan(0);
      expect(lgas.find(l => l.name === 'Ikeja')).toBeDefined();
    });

    it('should get LGAs for a state by ID', () => {
      const lgas = getLGAs('NG-LAG');
      expect(lgas.length).toBeGreaterThan(0);
    });

    it('should return empty array for non-existent state', () => {
      const lgas = getLGAs('Unknown');
      expect(lgas).toEqual([]);
    });
  });

  describe('searchStates', () => {
    it('should perform partial search correctly', () => {
      const results = searchStates('lag');
      expect(results.length).toBe(1);
      expect(results[0].name).toBe('Lagos');
    });

    it('should perform full text search correctly', () => {
      const results = searchStates('Lagos');
      expect(results.length).toBe(1);
      expect(results[0].id).toBe('NG-LAG');
    });
  });

  describe('searchLGAs', () => {
    it('should search for LGAs by name', () => {
      const results = searchLGAs('ikeja');
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].name).toBe('Ikeja');
      expect(results[0].id).toBe('NG-LAG-KJA');
    });
  });
});
