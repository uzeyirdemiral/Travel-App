import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './About.style';

const About = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}> Travel App Hakkında</Text>
      <Text style={styles.text}>
        Travel App, seyahat etmeyi seven kullanıcılar için tasarlanmış kapsamlı
        bir seyahat planlama uygulamasıdır. Kullanıcılar, dünya çapında popüler
        destinasyonlar hakkında bilgi edinebilir, kişiselleştirilmiş seyahat
        rotaları oluşturabilir, uygun konaklama seçeneklerini bulabilir ve
        seyahatleri boyunca kullanışlı ipuçlarına erişebilirler.
      </Text>
      <Text style={styles.text}>
        Geliştirici: Global Adventures Ltd. Global Adventures Ltd., dünya
        çapında kullanıcılarına yenilikçi seyahat çözümleri sunan bir yazılım
        geliştirme şirketidir. Kullanıcılarımızın en iyi seyahat deneyimlerini
        yaşamalarını sağlamak için çalışıyoruz.
      </Text>
      <Text style={styles.text}>Web Sitesi: www.globaladventures.com</Text>
      <Text style={styles.text}>E-posta: support@globaladventures.com</Text>
      <Text style={styles.text}>
        Sürüm Bilgileri: - Sürüm: 1.0.5 - Güncelleme Tarihi: 18 Haziran 2024
      </Text>
    </ScrollView>
  );
};

export default About;
