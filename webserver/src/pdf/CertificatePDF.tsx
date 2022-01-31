import React from 'react';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { Certificate } from '../models/Certificate';
import { Title } from '@material-ui/icons';

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#E4E4E4',
        position: 'relative',
    },
    section: {
        margin: 5,
        padding: 10
    },
    title: {
        fontSize: 15,
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: 'ultrabold',
    },
    paragraph: {
        margin: 10,
        fontSize: 12,
        textAlign: 'center',
    },
    footer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 0,
    }
});

interface Props {
    certificate: Certificate
}

function CertificatePDF(props: Props) {
    return (
        <Document>
            <Page orientation='landscape' size='A4' style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>{props.certificate.course.name}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.paragraph}>Curso Aprobado</Text>
                </View>
                <View style={styles.footer}>
                    <View style={styles.section}>
                        <Text style={styles.paragraph}>{props.certificate.student.name} {props.certificate.student.surname}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.paragraph}>{props.certificate.course.teacher.name} {props.certificate.course.teacher.surname}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}

export default CertificatePDF;
