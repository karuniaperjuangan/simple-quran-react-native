import axios from "axios";
import { useState, useEffect } from "react";
import { BackHandler, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigate, useParams } from "react-router-native";
import { useRecoilState } from "recoil";
import { translationEditionState } from "../state";

type AyatType = {
    number: number;
    text: string;
    numberInSurah: number;
    juz: number;
    manzil: number;
    page: number;
    ruku: number;
    hizbQuarter: number;
    sajda: boolean;
}
type SuratMetaType = {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
}
export default function SurahPage() {
    const { id } = useParams();
    const [AyatList, setAyatList] = useState<AyatType[]>([]);
    const [TranslationList, setTranslationList] = useState<AyatType[]>([]);
    const [SuratMeta, setSuratMeta] = useState<SuratMetaType>();
    const [translationEdition, setTranslationEdition] = useRecoilState(translationEditionState);
    const navigate = useNavigate();
    //Back if user press back button
    useEffect(() => {
        const backAction = () => {
            navigate('/')
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        async function getAyatList() {
            let response = await axios.get(`http://api.alquran.cloud/v1/surah/${id}`)
            if (response.data.code === 200) {
                let listAyat: AyatType[] = response.data.data.ayahs
                //Remove Basamalah from first ayat if surah is not Al-Fatihah
                if (id !== "1") {
                    listAyat[0].text = listAyat[0].text.replace("بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ", "")
                }
                setAyatList(response.data.data.ayahs)
                setSuratMeta(response.data.data)
            }
            let response2 = await axios.get(`http://api.alquran.cloud/v1/surah/${id}/${translationEdition}`)
            if (response2.data.code === 200) {
                setTranslationList(response2.data.data.ayahs)
            }
        }
        getAyatList()
    }, []);
    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={{ alignItems: "center" }}>
                <Text style={{ ...styles.text }}>{SuratMeta?.name}</Text>
                {
                    (id !== "1" && id !== "9") && <Text style={{ ...styles.text }}>بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ</Text>
                }
            </View>

            {AyatList.map((item, index) => {
                return (
                    <Pressable
                        onPress={
                            () => { }
                        } style={{ paddingVertical: 8 }}>

                        {/* Divider */}
                        <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />
                        <View style={{ backgroundColor: 'white', paddingHorizontal: 25, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <View style={{ position: 'relative', width: 32, height: 64 }}>
                                <View style={styles.centering}>
                                    <Image source={require('../assets/Vector.png')} style={{ width: 32, height: 32 }} />
                                </View>
                                <View style={styles.centering}>
                                    <Text style={{ ...styles.text, fontSize: 12, fontFamily: "Merriweather-Black" }}>{index + 1}</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center', flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: 12, flexGrow: 1 }}>
                                <Text style={{ ...styles.text, verticalAlign: "middle" }}>{item.text}</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{ ...styles.text, paddingHorizontal: 25 }}>{TranslationList[index]?.text}</Text>
                        </View>
                    </Pressable>
                )
            })}

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Merriweather-Regular',
        fontSize: 14,
        fontWeight: '400',
        color: 'black',
    },
    centering: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
})