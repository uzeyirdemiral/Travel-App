import React from 'react';
import { Text, ScrollView} from 'react-native';
import styles from './Help.style';

const Help = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Yardım ve Destek</Text>
      <Text style={styles.text}>
        Yardım ve destek almak için bizimle iletişime geçebilirsiniz. Aşağıdaki
        iletişim bilgilerini kullanarak bize ulaşabilirsiniz:
      </Text>
      <Text style={styles.subTitle}>E-posta</Text>
      <Text style={styles.text}>support@globaladventures.com</Text>
      <Text style={styles.subTitle}>Telefon</Text>
      <Text style={styles.text}>+90 555 555 5555</Text>
      <Text style={styles.text}>
        Size en kısa sürede geri dönüş yapacağız. Anlayışınız için teşekkür
        ederiz.
      </Text>
    </ScrollView>
  );
};

export default Help;
