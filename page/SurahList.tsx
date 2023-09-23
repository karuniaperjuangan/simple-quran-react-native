import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, FlatList, Image, Pressable, ScrollView, SectionList, StyleSheet, Text, View } from "react-native";
import { useNavigate } from "react-router-native";
import { useRecoilState } from "recoil";
import { translationEditionState } from "../state";

type SurahType = {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
}

type TranslationType = {
    identifier: string;
    language: string;
    name: string;
    englishName: string;
    format: string;
    type: string;
    direction: string;
}

export default function SurahListPage() {
    const navigate = useNavigate();
    const onPress = (id:number) => {
        navigate(`/surah/${id}`)
    }
    const [SurahList, setSurahList] = useState<SurahType[]>([]);
    const [TranslationList, setTranslationList] = useState<TranslationType[]>([]);
    const [translationEdition, setTranslationEdition] = useRecoilState(translationEditionState);
    useEffect(() => {
        async function getSurahList() {
            let response = await axios.get('http://api.alquran.cloud/v1/surah')
            if (response.data.code === 200) {
                setSurahList(response.data.data)
            }
        }
        async function getTranslationList() {
            let response = await axios.get('http://api.alquran.cloud/v1/edition/type/translation')
            if (response.data.code === 200) {
                setTranslationList(response.data.data)
            }
        }
        getSurahList()
        getTranslationList()
    }, []);
    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={{ alignItems: "center" }}>
                <Text style={{ ...styles.text }}>Head</Text>
                <Picker
                    selectedValue={"en.asad"}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => {
                        setTranslationEdition(itemValue)
                    }}>
                    {TranslationList.map((item, index) => {
                        return (
                            <Picker.Item label={`${item.language} - ${item.name}`} value={item.identifier} />
                        )
                    })}
                    </Picker>
            </View>
            {SurahList.map((item, index) => {
                return (
<Pressable
                    onPress={
                        () => onPress(item.number)
                    }>

                    {/* Divider */}
                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                    />
                    <View style={{ backgroundColor: 'white', paddingVertical: 8, paddingHorizontal: 25, flexDirection: 'row', justifyContent:'flex-start', alignItems: 'center' }}>
                        <View style={{ position: 'relative', width: 32, height: 64 }}>
                            <View style={styles.centering}>
                                <Image source={require('../assets/Vector.png')} style={{ width: 32, height: 32 }} />
                            </View>
                            <View style={styles.centering}>
                                <Text style={{ ...styles.text, fontSize: 12, fontFamily:"Merriweather-Black" }}>{item.number}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'flex-start', justifyContent: "flex-start", paddingHorizontal:12, maxWidth:160}}>
                            <Text style={styles.text}>{item.englishNameTranslation}</Text>
                            <Text style={{ ...styles.text }}>{`${item.revelationType} | ${item.numberOfAyahs.toString()} Ayats`}</Text>
                        </View>
                        <View style={{flexGrow:1}}></View>
                        <View style={{ alignItems: "flex-end" }}>
                            <Text style={styles.text}>{item.name}</Text>
                            <Text style={styles.text}>{item.englishName}</Text>
                        </View>

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
        fontSize: 16,
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