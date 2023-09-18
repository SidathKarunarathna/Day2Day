import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, ScrollView } from "react-native";
import Colors from "../../assets/color";
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit';
import data from "../../assets/data";

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};
export default function Reports({ navigation }: any) {
    return (
        <ScrollView style={styles.Container}>
            <View style={{ flexDirection: "row" }}>
                <View style={styles.icons}>
                    <FontAwesome5
                        name="arrow-left" size={20}
                        color={Colors.white} />
                </View>
                <Text style={styles.Header}>Insights</Text>
            </View>


            <View style={styles.section}>
                <View>
                    <Text style={styles.SubTopic}>Expenses over Time</Text>
                    <LineChart
                        data={{
                            labels: ["January", "February", "March", "April", "May", "June"],
                            datasets: [
                                {
                                    data: [
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100
                                    ]
                                }
                            ]
                        }}
                        width={Dimensions.get("window").width} // from react-native
                        height={220}
                        yAxisLabel="Rs."
                        yAxisSuffix="k"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: Colors.main,
                            backgroundGradientTo: Colors.lightBlack,
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: Colors.main
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                            margin: 15
                        }}
                    />
                </View>
                <View>
                    <Text style={styles.SubTopic}>Incomes over Time</Text>
                    <LineChart
                        data={{
                            labels: ["January", "February", "March", "April", "May", "June"],
                            datasets: [
                                {
                                    data: [
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100
                                    ]
                                }
                            ]
                        }}
                        width={Dimensions.get("window").width} // from react-native
                        height={220}
                        yAxisLabel="Rs."
                        yAxisSuffix="k"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: Colors.deepGray,
                            backgroundGradientFrom: Colors.main,
                            backgroundGradientTo: Colors.lightBlack,
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: Colors.main
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                            margin: 15
                        }}
                    />
                </View>
                <View>
                <Text style={styles.SubTopic}>Expences over Category</Text>
                    <View style={{backgroundColor: "#ADD8E6",margin:15,
                    borderRadius:15}}>
                    <PieChart
                        data={data}
                        width={Dimensions.get("window").width-30}
                        height={220}
                        chartConfig={chartConfig}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        center={[10, 50]}
                        absolute
                    />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: Colors.main,
        flex: 1
    },
    Header: {
        marginLeft: 115,
        fontSize: 24,
        width: "100%",
        marginTop: 20,
        color: Colors.white,
        fontWeight: "bold",
        marginBottom: 10
    },
    SubTopic: {
        marginLeft: 15,
        fontSize: 16,
        width: "100%",
        marginTop: 20,
        color: Colors.main
    },
    LeftTopic: {
        fontSize: 16,
        width: "100%",
        textAlign: "center",
        color: Colors.main,
        textDecorationLine: "underline"
    },
    stretch: {
        width: 231,
        height: 260,
        resizeMode: 'stretch',
        alignSelf: "center",
        marginTop: 50
    },
    section: {
        backgroundColor: Colors.secondary,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 1
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        marginLeft: 50,
        marginRight: 50,
        borderRadius: 20,
        borderColor: Colors.main,
        color: Colors.main,
    },
    buttonText: {
        marginLeft: 0,
        fontSize: 24,
        width: "100%",
        alignItems: "center",
        textAlign: "center",
        color: Colors.secondary,
        fontWeight: "bold",
        padding: 10
    },
    button: {
        backgroundColor: Colors.main,
        margin: 50,
        borderRadius: 30
    },
    icons: {
        marginLeft: 20,
        marginTop: 25,
    }
})