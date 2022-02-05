import ReactPDF, { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import React, { useContext, useEffect, useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit';
import CertificateCard from '../../../components/CertificateCard';
import Title from '../../../components/Title';
import { StudentContext } from '../../../context/StudentContext';
import { toastManager } from '../../../libs/toastManager';
import { decodeToken, getToken } from '../../../libs/tokenInterceptor';
import { CERTIFICATES_NAME, GETTING_DATA_ERROR, VOICE_ES } from '../../../libs/utils';
import { Certificate, certificateConverter } from '../../../models/Certificate';
import { getCertificatesByUser } from '../../../services/certificate.service';

const styles = {
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column' as const,
        overflowY: 'auto' as const,
    },
}

function CertificatePage() {

    const [certificates, setcertificates] = useState<Certificate[]>([]);

    const student = useContext(StudentContext);
    const { speak, cancel } = useSpeechSynthesis();

    const getCertificates = async () => {
        try {
            if (student) {
                const token: any = decodeToken(getToken());
                const response = await getCertificatesByUser(token.data);
                setcertificates(response.data.map(certificateConverter.fromJSON));
            }
        } catch (error: any) {
            toastManager.error(GETTING_DATA_ERROR);
            onSpeak(GETTING_DATA_ERROR);
        }
    }

    const onSpeak = (text: string) => {
        speak({ text: text, voice: VOICE_ES });
    }

    useEffect(() => {
        getCertificates();
        return () => { };
    }, [student]);


    return (
        <div style={styles.container}>
            <Title title={CERTIFICATES_NAME} />
            <div>
                {
                    certificates.map((certificate: Certificate, index: any) => (
                        <div key={index}>
                            <CertificateCard
                                certificate={certificate} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CertificatePage
