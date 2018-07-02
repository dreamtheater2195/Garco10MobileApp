import React, { Component } from 'react';
import { Dimensions, View, StyleSheet, ActivityIndicator, AsyncStorage, ScrollView, RefreshControl, TouchableOpacity, Picker, PickerIOS, Platform, InteractionManager } from 'react-native';
import { Icon, Button, Overlay, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { logOut } from '../actions/user_actions';
import { fetchDataLoHang } from '../actions/garco10_actions';
import { LinearGradient } from 'expo';
import moment from 'moment';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BUTTON_WIDTH = (SCREEN_WIDTH / 2) - 120;

class LoHangUpdateScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            showPicker: false,
            logingOut: false,
            maLoSx: ''
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Lô sản xuất',
            headerRight: (
                <Icon
                    reverse
                    name='ios-log-out'
                    type='ionicon'
                    color='#3D6DCC'
                    size={28}
                    onPress={navigation.getParam('logOutUser')} />
            ),
            headerStyle: {
                backgroundColor: '#3D6DCC'
            }
        }
    }

    componentWillMount() {
    }
    componentDidMount() {
        this.props.navigation.setParams({
            logOutUser: this.logOutUser
        });
        this.props.fetchDataLoHang(0, this.props.auth.user.ID_DonVi);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.auth.user) {
            this.props.navigation.navigate('Auth');
        }
    }

    fetchData = () => {
        this.setState({ refreshing: true });
        this.props.fetchDataLoHang(0, this.props.auth.user.ID_DonVi);
        this.setState({ refreshing: false });
    }

    logOutUser = () => {
        this.setState({ logingOut: true });
    }

    logOutConfirm = () => {
        this.props.logOut();
    }

    logOutCancel = () => {
        this.setState({ logingOut: false });
    }

    render() {
        const dateString = moment().format('DD/MM/YYYY');
        if (this.props.garco10.fetching) {
            return (
                <View style={styles.progressBar}>
                    <ActivityIndicator size="large" />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>Loading...</Text>
                </View>
            )
        }
        else if (this.props.garco10.error) {
            return (
                <View style={styles.progressBar}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
                        {this.props.garco10.error}
                    </Text>
                </View>
            )
        }
        else {
            return (
                <ScrollView
                    scrollEnabled={false}
                    keyboardDismissMode='on-drag'
                    keyboardShouldPersistTaps='handled'
                    contentContainerStyle={styles.defaultColumnContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.fetchData}
                            title="refreshing..."
                        />
                    }
                >

                    <LinearGradient
                        colors={['rgba(132, 182, 233, 0.5)', 'rgba(77,158,239, 0.7)', 'rgba(11,126,140, 0.8)']}
                        style={styles.linearGradient}
                    >
                        <View styles={{ flex: 20 }}>
                            {Platform.OS === "ios" ?
                                <PickerIOS>
                                    {!!this.props.garco10.lohang &&
                                        this.props.garco10.lohang.map((item, index) => {
                                            return <PickerIOS.Item
                                                key={index}
                                                label={this.props.garco10.dataDisplay[index]}
                                                value={item}
                                            />
                                        })
                                    }
                                </PickerIOS>
                                :
                                <Picker>
                                    {!!this.props.garco10.lohang &&
                                        this.props.garco10lohang.map((item, index) => {
                                            return <Picker.Item
                                                key={index}
                                                label={this.props.garco10.dataDisplay[index]}
                                                value={item}
                                            />
                                        })
                                    }
                                </Picker>
                            }
                        </View>
                        <View style={{
                            flex: 90,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 10,
                            backgroundColor: 'rgba(0,0,0,0.2)',
                        }}>
                            <Text
                                style={{ flex: 13, fontSize: 20, fontWeight: '600', marginTop: 5, color: '#000066' }}
                                numberOfLines={1}
                            >
                                TenDonVi - TenChuyenMay - {dateString}
                            </Text>
                            <Text
                                style={{ flex: 13, fontSize: 18, color: '#000040' }}
                                numberOfLines={1}
                            >
                                Lô s/x: #xyz
                        </Text>
                            <View style={{ flex: 13, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ backgroundColor: 'rgba(224,224,224,0.5)', borderColor: '#0090ff', borderTopWidth: 1, borderLeftWidth: 1, borderBottomWidth: 1, textAlign: 'center', fontWeight: '800', fontSize: 18, color: '#000066' }}>
                                        Khách hàng
                            </Text>
                                    <Text style={{ backgroundColor: 'rgba(224,224,224,0.5)', borderColor: '#0090ff', borderBottomWidth: 1, borderLeftWidth: 1, textAlign: 'center', fontSize: 18, color: '#000066' }}>
                                        Ten_KhachHang
                            </Text>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={{ backgroundColor: 'rgba(224,224,224,0.5)', borderColor: '#0090ff', borderTopWidth: 1, borderLeftWidth: 1, borderBottomWidth: 1, textAlign: 'center', fontWeight: '800', fontSize: 18, color: '#000066' }}>
                                        PO.NO
                            </Text>
                                    <Text style={{ backgroundColor: 'rgba(224,224,224,0.5)', borderColor: '#0090ff', borderBottomWidth: 1, borderLeftWidth: 1, textAlign: 'center', fontSize: 18, color: '#000066' }}>
                                        PO_NO
                            </Text>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={{ backgroundColor: 'rgba(224,224,224,0.5)', borderColor: '#0090ff', borderTopWidth: 1, borderLeftWidth: 1, borderBottomWidth: 1, textAlign: 'center', fontWeight: '800', fontSize: 18, color: '#000066' }}>
                                        Styles
                            </Text>
                                    <Text style={{ backgroundColor: 'rgba(224,224,224,0.5)', borderColor: '#0090ff', borderBottomWidth: 1, borderLeftWidth: 1, textAlign: 'center', fontSize: 18, color: '#000066' }}>
                                        StyleName
                            </Text>
                                </View>
                            </View>

                            <View style={{ flex: 39, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '80%' }}>
                                <View style={{ flex: 50 }}>
                                    <Text style={{ backgroundColor: 'rgba(0,0,0,0.1)', textAlign: 'center', fontWeight: '800', fontSize: 35, color: '#000066', borderColor: 'rgba(0,0,0,0.1)', borderBottomWidth: 1, borderRightWidth: 1 }}> </Text>
                                    <Text style={{ backgroundColor: 'rgba(0,0,0,0.1)', textAlign: 'left', fontWeight: '800', fontSize: 35, color: '#000066', borderRightWidth: 1, borderColor: 'rgba(0,0,0,0.1)' }}>LT</Text>
                                    <Text style={{ backgroundColor: 'rgba(0,0,0,0.1)', textAlign: 'left', fontWeight: '800', fontSize: 35, color: '#000066', borderColor: 'rgba(0,0,0,0.1)', borderTopWidth: 1, borderRightWidth: 1 }}>TN</Text>
                                </View>
                                <View style={{ flex: 100 }}>
                                    <Text style={{ backgroundColor: 'rgba(0,0,0,0.1)', textAlign: 'center', fontWeight: '800', fontSize: 35, color: '#000066', borderColor: 'rgba(0,0,0,0.1)', borderBottomWidth: 1 }}>T/H</Text>
                                    <Text style={{ backgroundColor: 'rgba(0,0,0,0.1)', textAlign: 'right', fontWeight: '800', fontSize: 35, color: 'rgba(172,19,2,0.7)' }}>
                                        1000
                                </Text>
                                    <Text style={{ backgroundColor: 'rgba(0,0,0,0.1)', textAlign: 'right', fontWeight: '800', fontSize: 35, color: 'rgba(172,19,2,1)', borderColor: 'rgba(0,0,0,0.1)', borderTopWidth: 1 }}>
                                        500
                                </Text>
                                </View>
                                <View style={{ flex: 100 }}>
                                    <Text style={{ backgroundColor: 'rgba(0,0,0,0.1)', textAlign: 'center', fontWeight: '800', fontSize: 35, color: '#000066', borderLeftWidth: 1, borderColor: 'rgba(0,0,0,0.1)', borderBottomWidth: 1 }}>K/H</Text>
                                    <Text style={{ backgroundColor: 'rgba(0,0,0,0.1)', textAlign: 'right', fontWeight: '800', fontSize: 35, color: 'rgba(172,19,2,0.7)', borderLeftWidth: 1, borderColor: 'rgba(0,0,0,0.1)' }}>
                                        1000
                                </Text>
                                    <Text style={{ backgroundColor: 'rgba(0,0,0,0.1)', textAlign: 'right', fontWeight: '800', fontSize: 35, color: 'rgba(172,19,2,1)', borderLeftWidth: 1, borderColor: 'rgba(0,0,0,0.1)', borderTopWidth: 1 }}>
                                        500
                                </Text>
                                </View>
                                <View style={{ flex: 90 }}>
                                    <Text style={{ backgroundColor: 'rgba(0,0,0,0.1)', textAlign: 'center', fontWeight: '800', fontSize: 35, color: '#000066', borderLeftWidth: 1, borderColor: 'rgba(0,0,0,0.1)', borderBottomWidth: 1 }}>%</Text>
                                    <Text style={{ backgroundColor: 'rgba(0,0,0,0.1)', textAlign: 'right', fontWeight: '800', fontSize: 35, color: 'rgba(172,19,2,0.7)', borderLeftWidth: 1, borderColor: 'rgba(0,0,0,0.1)' }}>
                                        50%
                                </Text>
                                    <Text style={{ backgroundColor: 'rgba(0,0,0,0.1)', textAlign: 'right', fontWeight: '800', fontSize: 35, color: 'rgba(172,19,2,1)', borderLeftWidth: 1, borderColor: 'rgba(0,0,0,0.1)', borderTopWidth: 1 }}>
                                        40%
                                </Text>
                                </View>
                            </View>

                            <View style={{ flex: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                                    <TouchableOpacity activeOpacity={0.9}>
                                        <View style={styles.viewButton1}>
                                            <Text style={styles.viewButtonText10plus}>+1</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.9}>
                                        <View style={styles.viewButton2}>
                                            <Text style={styles.viewButtonText10minus}>-1</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                                    <TouchableOpacity activeOpacity={0.9}>
                                        <View style={styles.viewButton3}>
                                            <Text style={styles.viewButtonText10plus}>+10</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.9}>
                                        <View style={styles.viewButton4}>
                                            <Text style={styles.viewButtonText10minus}>-10</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                    <Overlay
                        isVisible={this.state.logingOut}
                        onBackdropPress={this.logOutCancel}
                        overlayStyle={{
                            height: SCREEN_HEIGHT / 3
                        }}
                    >
                        <View style={[styles.defaultColumnContainer, { flex: 2 }]}>
                            <Text style={{ fontSize: 18 }}>
                                Bạn có chắc muốn đăng xuất?
                        </Text>
                        </View>

                        <View style={[styles.overlayButtonContainer]}>
                            <Button
                                title="Có"
                                onPress={this.logOutConfirm}
                                buttonStyle={[styles.overlayButton, { backgroundColor: 'rgba(78, 116, 289, 1)' }]}
                                titleStyle={{ color: 'white', marginHorizontal: 20 }}
                            />
                            <Button
                                title="Không"
                                onPress={this.logOutCancel}
                                buttonStyle={[styles.overlayButton, { backgroundColor: 'white', borderColor: 'rgba(78, 116, 289, 1)', borderWidth: 1 }]}
                                titleStyle={{ color: 'rgba(78, 116, 289, 1)' }}
                            />
                        </View>
                    </Overlay>
                </ScrollView>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    garco10: state.garco10,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {
        logOut,
        fetchDataLoHang
    }
)(LoHangUpdateScreen);

const styles = StyleSheet.create({
    defaultRowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    defaultColumnContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlayButtonContainer: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-end'
    },
    overlayButton: {
        marginBottom: 10
    },
    linearGradient: {
        flex: 1,
        width: SCREEN_WIDTH
    },
    viewButton1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: 0,
        borderRadius: 90,
        borderColor: 'white',
        backgroundColor: 'rgba(204,255,204,0.5)',//0090ff
        width: BUTTON_WIDTH,
        height: BUTTON_WIDTH,
        marginLeft: 5
    },
    viewButton2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: 0,
        borderRadius: 90,
        borderColor: 'white',
        backgroundColor: 'rgba(255,255,204,0.5)',//F035E0
        width: BUTTON_WIDTH,
        height: BUTTON_WIDTH,
        marginLeft: 20
    },
    viewButton3: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: 0,
        borderRadius: 90,
        borderColor: 'white',
        backgroundColor: '#e0e0e0',//F035E0
        width: BUTTON_WIDTH,
        height: BUTTON_WIDTH,
        marginLeft: 0
    },
    viewButton4: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: 0,
        borderRadius: 90,
        borderColor: 'white',
        backgroundColor: '#e0e0e0',//F035E0
        width: BUTTON_WIDTH,
        height: BUTTON_WIDTH,
        marginLeft: 20
    },
    viewButtonText10plus: {
        fontSize: 40,
        color: '#4C9900',
        backgroundColor: 'transparent',
    },
    viewButtonText10minus: {
        fontSize: 40,
        color: '#ff3333',
        backgroundColor: 'transparent',
    },
    progressBar: {
        backgroundColor: '#0A0A0A',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})