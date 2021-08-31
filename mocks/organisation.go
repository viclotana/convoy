// Code generated by MockGen. DO NOT EDIT.
// Source: organisation.go

// Package mocks is a generated GoMock package.
package mocks

import (
	context "context"
	gomock "github.com/golang/mock/gomock"
	hookcamp "github.com/hookcamp/hookcamp"
	reflect "reflect"
)

// MockOrganisationRepository is a mock of OrganisationRepository interface.
type MockOrganisationRepository struct {
	ctrl     *gomock.Controller
	recorder *MockOrganisationRepositoryMockRecorder
}

// MockOrganisationRepositoryMockRecorder is the mock recorder for MockOrganisationRepository.
type MockOrganisationRepositoryMockRecorder struct {
	mock *MockOrganisationRepository
}

// NewMockOrganisationRepository creates a new mock instance.
func NewMockOrganisationRepository(ctrl *gomock.Controller) *MockOrganisationRepository {
	mock := &MockOrganisationRepository{ctrl: ctrl}
	mock.recorder = &MockOrganisationRepositoryMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockOrganisationRepository) EXPECT() *MockOrganisationRepositoryMockRecorder {
	return m.recorder
}

// CreateOrganisation mocks base method.
func (m *MockOrganisationRepository) CreateOrganisation(arg0 context.Context, arg1 *hookcamp.Organisation) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreateOrganisation", arg0, arg1)
	ret0, _ := ret[0].(error)
	return ret0
}

// CreateOrganisation indicates an expected call of CreateOrganisation.
func (mr *MockOrganisationRepositoryMockRecorder) CreateOrganisation(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateOrganisation", reflect.TypeOf((*MockOrganisationRepository)(nil).CreateOrganisation), arg0, arg1)
}

// FetchOrganisationByID mocks base method.
func (m *MockOrganisationRepository) FetchOrganisationByID(arg0 context.Context, arg1 string) (*hookcamp.Organisation, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FetchOrganisationByID", arg0, arg1)
	ret0, _ := ret[0].(*hookcamp.Organisation)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FetchOrganisationByID indicates an expected call of FetchOrganisationByID.
func (mr *MockOrganisationRepositoryMockRecorder) FetchOrganisationByID(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FetchOrganisationByID", reflect.TypeOf((*MockOrganisationRepository)(nil).FetchOrganisationByID), arg0, arg1)
}

// LoadOrganisations mocks base method.
func (m *MockOrganisationRepository) LoadOrganisations(arg0 context.Context) ([]*hookcamp.Organisation, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "LoadOrganisations", arg0)
	ret0, _ := ret[0].([]*hookcamp.Organisation)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// LoadOrganisations indicates an expected call of LoadOrganisations.
func (mr *MockOrganisationRepositoryMockRecorder) LoadOrganisations(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "LoadOrganisations", reflect.TypeOf((*MockOrganisationRepository)(nil).LoadOrganisations), arg0)
}

// UpdateOrganisation mocks base method.
func (m *MockOrganisationRepository) UpdateOrganisation(arg0 context.Context, arg1 *hookcamp.Organisation) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpdateOrganisation", arg0, arg1)
	ret0, _ := ret[0].(error)
	return ret0
}

// UpdateOrganisation indicates an expected call of UpdateOrganisation.
func (mr *MockOrganisationRepositoryMockRecorder) UpdateOrganisation(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdateOrganisation", reflect.TypeOf((*MockOrganisationRepository)(nil).UpdateOrganisation), arg0, arg1)
}