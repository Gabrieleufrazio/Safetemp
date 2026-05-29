import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

const SERVER_URL = 'http://172.20.10.11:3000/api/sensor'; 

export default function App() {
  const [data, setData] = useState({ temperature: 0, humidity: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Animações
  const fadeAnim = useState(new Animated.Value(0))[0];
  const pulseAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    fetchData(); 

    const interval = setInterval(() => {
      fetchData();
    }, 2000);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    // Animação de pulsar para o status online
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.5, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true })
      ])
    ).start();

    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(SERVER_URL);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError('Buscando sinal do sensor...');
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundColors = () => {
    if (data.temperature > 30) {
      return ['#450a0a', '#dc2626', '#fca5a5']; // Tema Quente
    } else if (data.temperature > 20) {
      return ['#064e3b', '#059669', '#6ee7b7']; // Tema Agradável
    } else {
      return ['#172554', '#2563eb', '#93c5fd']; // Tema Frio
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={getBackgroundColors()}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="broadcast" size={32} color="#ffffff" />
          <Text style={styles.title}>Estação IoT</Text>
        </View>
        <Text style={styles.subtitle}>PROJETO EXPOTECH</Text>

        <BlurView intensity={40} tint="light" style={styles.glassCard}>
          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
          ) : (
            <>
              {/* Seção Temperatura */}
              <View style={styles.metricContainer}>
                <View style={styles.iconCircle}>
                  <MaterialCommunityIcons name="thermometer" size={36} color="#ffffff" />
                </View>
                <View style={styles.metricData}>
                  <Text style={styles.metricLabel}>TEMPERATURA</Text>
                  <View style={styles.valueRow}>
                    <Text style={styles.valueText}>{data.temperature.toFixed(1)}</Text>
                    <Text style={styles.unitText}>°C</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.divider} />
              
              {/* Seção Umidade */}
              <View style={styles.metricContainer}>
                <View style={[styles.iconCircle, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
                  <MaterialCommunityIcons name="water-percent" size={36} color="#ffffff" />
                </View>
                <View style={styles.metricData}>
                  <Text style={styles.metricLabel}>UMIDADE DO AR</Text>
                  <View style={styles.valueRow}>
                    <Text style={styles.valueText}>{data.humidity.toFixed(1)}</Text>
                    <Text style={styles.unitText}>%</Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </BlurView>
        
        {error ? (
          <View style={styles.errorContainer}>
            <ActivityIndicator size="small" color="#fca5a5" style={{marginRight: 10}} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <View style={styles.statusContainer}>
            <Animated.View style={[styles.dot, { transform: [{ scale: pulseAnim }] }]} />
            <Text style={styles.statusText}>Sistema Online e Lendo</Text>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 2,
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 40,
    fontWeight: '600',
    letterSpacing: 4,
  },
  glassCard: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 30,
    padding: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  loader: {
    paddingVertical: 50,
  },
  metricContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  iconCircle: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  metricData: {
    flex: 1,
  },
  metricLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 2,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  valueText: {
    fontSize: 52,
    fontWeight: '800',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  unitText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 4,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 25,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#34d399',
    marginRight: 10,
    shadowColor: '#34d399',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  errorText: {
    color: '#fca5a5',
    fontSize: 14,
    fontWeight: '600',
  }
});
